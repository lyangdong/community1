import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http} from '@angular/http';
import { RequestService } from '../../services/request.service';

declare let $:any;

@Component({
  selector: 'app-templet',
  templateUrl: './templet.component.html',
  styleUrls: ['./templet.component.css']
})
export class TempletComponent implements OnInit {

  constructor(private http: Http, private router: Router, private requestService: RequestService) { }

  ngOnInit() {
    $('#loading_con').fadeOut();
  }

}
