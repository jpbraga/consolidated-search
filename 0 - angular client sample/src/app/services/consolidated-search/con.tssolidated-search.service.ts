import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConsolidatedRecord } from 'src/app/interfaces/consolidated-record.interface';
import { environment } from 'src/environments/environment';
import { ConsolidatedSearchProvider } from '../endpoint/ConsolidatedSearch.provider';
import { WebSocketService } from '../websocket/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ConsolidatedSearchService {
  private subscription: Subscription = null;
  constructor(public ws: WebSocketService,
              public csp: ConsolidatedSearchProvider) {

  }

  public search(param?: string): Promise<ConsolidatedRecord[]> {
    return new Promise((resolve, reject) => {
      this.ws.connect();
      this.subscription = this.ws.subscribe().subscribe((data) => {
        console.log(data);
        let content = null;
        let connId = '';
        if (typeof data === 'string') { content = JSON.parse(data); }
        else { content = data; }
        if (content && content.connectionId) {
          connId = content.connectionId;
          const search: any = {
            input: {
              query: param ? param : '',
              requestContext: {
                domainName: environment.domanName,
                stage: environment.stage,
                connectionId: connId
              }
            }
          };
          this.csp.post(search, { 'Content-Type': 'application/json' }).subscribe((next) => {
            console.log(next);
          }, (error) => {
            console.log(error);
            reject(error);
          });
        } else if (data.body.body){
          this.ws.close();
          if ( this.subscription ) { this.subscription.unsubscribe(); }
          resolve(JSON.parse(data.body.body));
        } else {
          reject('no data returned');
        }
      }, (error) => {
        console.error('websocket connection error: ' + JSON.stringify(error));
        reject(error);
      });
      this.ws.sendMessage({
        action: 'getconnid'
      });
    });
  }
}
