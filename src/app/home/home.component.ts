import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts: Array<Object> = [];
  public subscriptions: Array<Subscription> = [];
  public currentPage = 1;
  public itemsPerPage = 10;
  public totalItems = 0;

  constructor(
      private api: ApiService,
      private router: Router
    ) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.api.getAll().subscribe(allPosts => {
        this.posts = [...allPosts];
        this.totalItems = this.posts.length;
      })
    );
  }

  view(post: any, viewType: string) {
    if (viewType === 'create') {
      this.router.navigate(['/posts/', post.id, { id: 'new', title: '', body: '' }]);
    } else if (viewType === 'edit') {
      this.router.navigate(['/posts/', post.id, { ...post, isEditable: true }]);
    }
  }

  delete(id: string) {
    console.log(`Deleting post ${id}...`);
    const confirm = window.confirm(`Are you sure you want to delete post ${id}`);
    if (confirm) {
      this.subscriptions.push(this.api.deletePost(id).subscribe((res => {
        this.posts.splice(Number(id) - 1, 1);
        window.alert('Post deleted succesfully!');
      })));
    }
  }

  ngDoCheck() {
    this.totalItems = this.posts.length;
  }

  ngOnDestroy() {
    console.log('unsubscribing...');
    this.subscriptions.map((sub) => sub.unsubscribe());
  }
}
