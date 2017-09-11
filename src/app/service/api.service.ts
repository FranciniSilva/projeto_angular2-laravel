import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

interface Options {
  limit?: number;
  page?: number;
}

@Injectable()
export class ApiService {

  private url: string;
  private header: Headers;

  constructor(private http: Http) {
      this.setAccessToken();
  }

  setAccessToken() {
    let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdlOGZlYzIwNmQzNzdhNDYwYThmMmNlZGFhNTAzOGI2ZjUzNTc1NDcyODFjNzQ0MWJhMzY4YmYxZWYyOWUxNGFmM2JkNmE1MmI5YzQ5ZTRjIn0.eyJhdWQiOiIyIiwianRpIjoiN2U4ZmVjMjA2ZDM3N2E0NjBhOGYyY2VkYWE1MDM4YjZmNTM1NzU0NzI4MWM3NDQxYmEzNjhiZjFlZjI5ZTE0YWYzYmQ2YTUyYjljNDllNGMiLCJpYXQiOjE1MDUwODczNDYsIm5iZiI6MTUwNTA4NzM0NiwiZXhwIjoxNTA1MDkwOTQxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.ljosQmZDET8YvjMd9xMDmXsqBnZNucf2JQgyDwDELOv6x0hyXlQbUem1edr1ObwqBTtbdgaZgELzA3--zeUw6NlznEskMujufxbtImDoWf7DQ7tVLva9CmENejLBKmAEokdvdaTxalpZqBcbRp7PrbBiVHr4xnAZzIPZzwN_XUpOexqHztQGkR1NKLVqqcOP2RYjDhJpQYgIuXwlSPZaOThzRZXPFOJj_2UVj7WEH6DDoku4QyOL4-ead6YtKDUk_AHHvyWqWVG37aSMqZ0HugnKXQ4CNNIKFQGgv48CsxCh6YaYE9bcT18PMRd1iSQAiUCvKO151yV8vqb5nhoQpb8Zl8pdB6QzMKVimJp0YmaqaXdklcM7BSge42tzENOgUfc4TN1IECA-6u1WWwFE0gPTrp0uX-zn6H00-y05KA7Pf7RY9HfagYtUx2HWT1dF8FPDM-9jrpMVAhZkuLwxLuTc0bqruDhbwcPV9anG2vmbsu-Pg_A6ATS2Cb7M6efQNEBdSe2MzGvcIwY_d8VuuUExclvexNyV8XV6GxevNMvN_xDK_7VflIInQVym-GG0cXrHRT5YXMr6L5_CZt2xYf79AEkGZ38sHzDj7TPPemJUGqrTgFxVSWWdfLdt0UjjYSviLB4Sg7ex_dAJua_KbZt6PKAxG35iEnt49339pJ4';
    this.header = new Headers({ 'Authorization': 'Bearer ' + token });
  }

  builder(resource: string) {
    this.url = 'http://localhost:8000/api/' + resource;
    return this;
  }

  list(options: Options = {}) {
    let url = this.url;

    if (options.limit === undefined) {
      options.limit = 20;
    }

    if (options.page === undefined) {
      options.page = 1;
    }

    url += '?limit=' + options.limit;
    url += '&page=' + options.page;

    return this.http.get(url, { headers: this.header })
      .toPromise()
      .then((res) => {
        return res.json() || {};
      })

  }

  view(id: number) {
    return this.http.get(this.url + '/' + id, { headers: this.header })
      .toPromise()
      .then((res) => {
        return res.json() || {};
      })
  }

  update(id: number, data: any) {
    return this.http.put(this.url + '/' + id, data, { headers: this.header })
      .toPromise()
      .then((res) => {
        return res.json() || {};
      })

  }

  create(data: any) {
    return this.http.post(this.url, data, { headers: this.header })
      .toPromise()
      .then((res) => {
        return res.json() || {};
      })
  }

  remove(id: number) {
    return this.http.delete(this.url + '/' + id, { headers: this.header })
      .toPromise()
      .then((res) => {
        return res.json() || {};
      })

  }

}
