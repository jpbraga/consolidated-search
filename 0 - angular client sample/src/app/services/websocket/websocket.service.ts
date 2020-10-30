import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { EMPTY, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export const WS_ENDPOINT = environment.csearchWSAPIURL;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(switchAll(), catchError(e => { throw e; }));

  public connect(): void {
    console.log('Opening webSocket connection...');
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket(): WebSocketSubject<unknown> {
    return webSocket(WS_ENDPOINT);
  }
  sendMessage(msg: any): void {
    this.socket$.next(msg);
  }
  close(): void {
    this.socket$.complete();
  }

  subscribe(): Observable<any> {
    return this.socket$.asObservable();
  }
}
