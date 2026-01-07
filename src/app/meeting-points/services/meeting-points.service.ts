import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../core/config/api.config';
import { map, Observable } from 'rxjs';
import { AddMeetingPointDB, MeetingPoint, MeetingPointDB, UpdateMeetingPointDB, mapMeetingPointToMeetingPoint } from '../../core/models/MeetingPoint';
import { Manufacturer } from '../../core/models/Manufacturer';
import { InsertOneResult } from '../../core/models/InsertOneResult';

@Injectable({
  providedIn: 'root'
})
export class MeetingPointsService {

  private readonly http = inject(HttpClient);
  private readonly url = API_CONFIG.BASE_URL + API_CONFIG.MEETING_POINTS_URL;

  getMeetingPointsByManufacturer(manufacturerId: Manufacturer['uuid']): Observable<MeetingPoint[]> {
    return this.http.get<MeetingPointDB[]>(this.url + '/manufacturer/' + manufacturerId).pipe(map(meetingPoints => meetingPoints.map(mapMeetingPointToMeetingPoint)));
  }

  createMeetingPoint(meetingPoint: AddMeetingPointDB): Observable<InsertOneResult> {
    return this.http.post<InsertOneResult>(this.url, meetingPoint);
  }

  updateMeetingPoint(meetingPointId: MeetingPoint['uuid'], meetingPoint: UpdateMeetingPointDB): Observable<void> {
    return this.http.put<void>(this.url + '/' + meetingPointId, meetingPoint);
  }

  deleteMeetingPoint(meetingPointId: MeetingPoint['uuid']): Observable<void> {
    return this.http.delete<void>(this.url + '/' + meetingPointId);
  }
}
