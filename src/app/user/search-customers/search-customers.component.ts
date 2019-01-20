import { Component, OnInit } from '@angular/core';
import { Vol } from '../../vol';
import { VolService } from '../../vol.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchVolsComponent implements OnInit {
 
  prix: number;
  vols: Vol[];
  constructor(private dataService: VolService) { }

  ngOnInit() {
    this.prix=0; }
    private searchVol() {
      this.dataService.findVolbyprix(this.prix)
        .subscribe(vols => this.vols = vols);
      
        
    }
    hack(vols) {
      return Array.from(vols);
    } 
    onSubmit() {
      this.searchVol();
    }
  }



