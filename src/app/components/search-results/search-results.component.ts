import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { PropertySearchService } from 'src/app/services/property-search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.less']
})
export class SearchResultsComponent implements OnInit {
  count: number;
  search_value: any;
  initLoading = true; // bug
  loadingMore = true;
  results?;

  constructor(
    private route: ActivatedRoute,
    private props: PropertySearchService
  ) { }

  ngOnInit(): void {
    this.search_value = this.route.snapshot.params.find;
    this.recent_searches_manipulating();

    this.route.data
    .subscribe((next: { result: Employees[], count: number }) => {
      console.log(next);
      this.results = next.result;
      this.count = next.count;
      this.initLoading = false;

      this.loadingMore = this.disableLoadMore();
    });
  }

  onLoadMore(): void {
    this.loadingMore = true;
    this.props.load_more(this.search_value, this.results.length)
      .subscribe(
        next => {
          console.log(next);

          this.results = [...this.results, ...next];
          this.loadingMore = this.disableLoadMore()
          console.log(this.results.length);
        }
      )
  }

  disableLoadMore() {
    return this.count > this.results.length ? true : false;
  }

  recent_searches_manipulating(): void {
    let searches_storage = JSON.parse(localStorage.getItem('recent_searches'));
    console.log(searches_storage);
    searches_storage = [this.search_value, ...searches_storage];
    if (searches_storage.length > 5) searches_storage.pop();
    localStorage.setItem('recent_searches', JSON.stringify(searches_storage));
  }

}
