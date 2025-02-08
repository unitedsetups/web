import {
  Component,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmptyComponent } from './layouts/empty/empty.component';

@Component({
  selector: 'app-layout',
  imports: [EmptyComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  private readonly _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  layout = signal<string>('');

  ngOnInit(): void {
    // Get the current activated route
    let route = this._activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const layoutFromQueryParam = route.snapshot.queryParamMap.get('layout');

    if (layoutFromQueryParam) {
      this.layout.set(layoutFromQueryParam);
    }

    const paths = route.pathFromRoot;
    paths.forEach((path) => {
      // Check if there is a 'layout' data
      if (path.routeConfig && path.routeConfig.data) {
        // Set the layout
        this.layout.set(path.routeConfig.data['layout']);
      }
    });
  }
}
