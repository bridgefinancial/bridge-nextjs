import { FormSubmission } from '@/app/types';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { OnboardingFormSuccessComponent } from '@/app/routes/onboarding-form-success/onboarding-form-success.component';
import { environment } from '@/environments/environment';
import { CheckListItemComponent } from '@/app/components/check-list-item/check-list-item.component';
import { PORTAL_TABS, PortalTab } from '@/app/app.routes';
import { Subscription, filter } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AuthService } from '@/app/auth';
import { MatMenuModule } from '@angular/material/menu';
import { AvatarComponent } from '@/app/components/avatar/avatar.component';

export type CheckListItem = {
  title: string;
  content: string;
  completed: boolean;
  routerLink: string;
  formId?: number;
};

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    OnboardingFormSuccessComponent,
    CheckListItemComponent,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    AvatarComponent,
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent implements OnInit {
  public forms: any[] = [];
  public formSubmissions: Record<number, FormSubmission> = {};
  public checkListItems: CheckListItem[] = [];
  public tabs: PortalTab[] = PORTAL_TABS;
  activeChildRoute: string = '';
  private routerSubscription: Subscription | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService,
  ) {}

  public ngOnInit() {
    this.http
      .get(`${environment['DJANGO_API_BASE_URL'] ?? 'http://localhost:8000'}/api/forms/`)
      .subscribe((forms: any) => {
        this.forms = forms.results;
        this.checkListItems.push(
          ...this.forms.map((form) => {
            return {
              title: form.name,
              content: `Complete the <strong>${form.name}</strong> Form`,
              completed: false,
              routerLink: `/forms/${form.id}`,
              formId: form.id,
            };
          }),
        );
        this.forms.forEach((form) => {
          this.http
            .get<FormSubmission>(
              `${environment['DJANGO_API_BASE_URL'] ?? 'http://localhost:8000'}/api/form-submission/${form.id}`,
            )
            .subscribe(
              (value) => {
                this.formSubmissions[form.id] = value;
              },
              (err) => {},
            );
        });
      });

    // Subcribe to the router changes
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveChildRoute();
      });

    // Set the active route on initial load
    this.setActiveChildRoute();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  public logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  private setActiveChildRoute(): void {
    let child = this.route.firstChild;
    while (child) {
      if (child.snapshot.url.length) {
        this.activeChildRoute = child.snapshot.url[0].path;
        break;
      }
      child = child.firstChild;
    }
  }
}
