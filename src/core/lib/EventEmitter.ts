export type EventMap = Record<string, unknown>;

type Listener<Payload> = (payload: Payload) => void;
type EventClosure = () => void;

export class EventEmitter<Events extends EventMap> {
  private listeners = new Map<
    keyof Events,
    Set<Listener<Events[keyof Events]>>
  >();

  public on<EventName extends keyof Events>(
    eventName: EventName,
    listener: Listener<Events[EventName]>,
  ): EventClosure {
    let eventListeners = this.listeners.get(eventName);

    if (!eventListeners) {
      eventListeners = new Set();
      this.listeners.set(eventName, eventListeners);
    }

    eventListeners.add(listener as Listener<Events[keyof Events]>);

    return () => {
      eventListeners?.delete(listener as Listener<Events[keyof Events]>);
    };
  }

  public emit<EventName extends keyof Events>(
    eventName: EventName,
    payload: Events[EventName],
  ): void {
    const eventListeners = this.listeners.get(eventName);

    if (!eventListeners) return;

    for (const listener of eventListeners) {
      listener(payload);
    }
  }

  public clear(): void {
    this.listeners.clear();
  }
}
