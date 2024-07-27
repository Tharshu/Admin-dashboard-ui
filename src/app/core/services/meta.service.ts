import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiListResponse, ApiResponse } from '../model/common.model';
import { ApiEndpoint } from '../constants/constants';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(private _http: HttpClient) { }

  getAllRoles(){
    return this._http.get<ApiListResponse<Role>>(`${ApiEndpoint.Meta.Roles}`);
  }
}
