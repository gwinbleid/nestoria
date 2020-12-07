import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employees } from 'src/app/model/employee';
import { PropertySearchService } from 'src/app/services/property-search.service';

@Component({
  selector: 'app-property-listing',
  templateUrl: './property-listing.component.html',
  styleUrls: ['./property-listing.component.css']
})
export class PropertyListingComponent implements OnInit, OnDestroy {
  id: string = '';
  item ;
  favors: boolean;
  local_store_data: Employees[] | null;

  constructor(
    private route: ActivatedRoute,
    private props: PropertySearchService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.props.search_one(this.id)
    .subscribe(next => {
      this.item = next;
      console.log(next)
      this.local_store_data = JSON.parse(localStorage.getItem('favour_employes'));
      if (this.local_store_data && this.local_store_data.findIndex(element => element._id === this.id) !== -1) {
        this.favors = true;
      } else {
        this.favors = false;
      }
    })
  }

  toggleFavors() {
    if (this.favors) {
      this.local_store_data.splice(this.local_store_data.findIndex(({_id}) => _id === this.id), 1);
      this.favors = !this.favors;
    } else {
      if (!this.local_store_data) this.local_store_data = [];
      this.local_store_data = this.local_store_data.concat(this.item);
      this.favors = !this.favors;
    }
  }

  ngOnDestroy() {
    if (this.local_store_data) {
      localStorage.setItem('favour_employes', JSON.stringify(this.local_store_data));
    }
  }
}
