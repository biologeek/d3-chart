import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription, BehaviorSubject } from "rxjs";
import { ChartConfiguration } from "../model/chart-params";
import { filter, map } from 'rxjs/operators';

interface Message {
    type: MessageType;
    payload: ChartConfiguration;
}

export enum MessageType {
    DATA_UPDATE, CONFIG_UPDATE, Y_AXIS_CREATE, X_AXIS_CREATE
}

type MessageCallback = (payload: ChartConfiguration) => void;

@Injectable()
export class EventsService {


    private handler = new Subject<Message>();

    constructor() {
    }

    /**
     * Broadcasts message to subscribers
     */
    broadcast(type: MessageType, payload: ChartConfiguration) {
        console.log('Emitting event ' + type.toString());
        this.handler.next({ type, payload });
    }

    /**
     * Handles subscription to MessageTypes messages
     */
    subscribe(callback: MessageCallback, type?: MessageType): Subscription {
        return this.handler
            .pipe(
                filter(message => (message.type === type || !type)),
                map(message => message.payload)
            )
            .subscribe(callback);
    }

}
