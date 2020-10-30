import { Component, OnInit } from '@angular/core';
import { ConsolidatedRecord } from '../interfaces/consolidated-record.interface';
import { ConsolidatedSearchService } from '../services/consolidated-search/con.tssolidated-search.service';



@Component({
  selector: 'app-csearch-component',
  templateUrl: './csearch-component.component.html',
  styleUrls: ['./csearch-component.component.scss']
})
export class CsearchComponentComponent implements OnInit {

  public data = { title: '' };
  public showSpinner = false;
  public isSearching = false;
  public submitted = false;
  public timeStamp = 0;

  constructor(public css: ConsolidatedSearchService) {
  }
  records: ConsolidatedRecord[] = [];

  public async search(): Promise<void> {
    this.timeStamp = Date.now();
    this.submitted = true;
    this.showSpinner = true;
    this.isSearching = true;
    this.records = await this.css.search(this.data.title);
    this.showSpinner = false;
    this.isSearching = false;
    this.timeStamp = (Date.now() - this.timeStamp) / 1000;
  }

  ngOnInit(): void {
  }

}
