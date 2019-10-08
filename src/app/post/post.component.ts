import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public post = { id: '', title: '', body: '' };
  public viewMode = 'create'

  constructor(
      private routerParams: ActivatedRoute,
      private router: Router,
      private api: ApiService
    ) {

  }

  ngOnInit() {
    this.post.id = this.routerParams.snapshot.paramMap.get('id');
    this.post.title = this.routerParams.snapshot.paramMap.get('title');
    this.post.body = this.routerParams.snapshot.paramMap.get('body');
    if (this.post.id === 'new') {
      this.viewMode = 'create;'
    } else {
      this.viewMode = 'edit';
    }
  }

  save() {
    if (this.viewMode === 'create') {
      // this.api.createPost()
    } else {
      // this.api.updatePost()
    }
  }

  cancel() {
    console.log('cancel')
    this.router.navigate(['/posts']);
  }
}
