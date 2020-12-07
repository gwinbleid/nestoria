import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertySearchService } from 'src/app/services/property-search.service';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css']
})
export class PropertySearchComponent implements OnInit {

  value?: string;
  searches = [];

  constructor(
    private prop_search : PropertySearchService,
    private router: Router  
  ) { }

  ngOnInit(): void {
    let from_storage = JSON.parse(localStorage.getItem('recent_searches'));
    if (from_storage) this.searches = this.searches.concat(from_storage);
    if (!from_storage) localStorage.setItem('recent_searches', JSON.stringify(this.searches));
  }

  search() {
    console.log(this.value);
    
    this.router.navigate(['/search', {find: this.value}]);
    /*this.prop_search.search(this.value)
      .subscribe(data => {
        console.log(data);
      })*/
  }

}
