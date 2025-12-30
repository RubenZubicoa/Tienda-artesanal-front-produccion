import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MANUFACTURERS_SECTIONS, Section, SIDENAV_SECTIONS } from '../../../core/models/Section';
import { SectionButtonComponent } from '../../../shared/components/section-button/section-button.component';
import { MatDividerModule } from '@angular/material/divider';
import { CurrentUserService } from '../../../core/services/current-user.service';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, CommonModule, MatIconModule, SectionButtonComponent, MatDividerModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  private readonly currentUserService = inject(CurrentUserService);

  public isManufacturer = this.currentUserService.isManufacturer;

  public sections: Section[] = SIDENAV_SECTIONS;
  public manufacturersSections: Section[] = MANUFACTURERS_SECTIONS;
}
