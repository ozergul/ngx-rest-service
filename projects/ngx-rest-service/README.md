## Install

    npm install ngx-rest-servic

or

    yarn add ngx-rest-service 
    
### Usage
Add to imports:
```typescript
@NgModule({  
  imports: [  
    NgxRestModule.forRoot({  
      apiBaseUrl: 'http://localhost:3001', // <---- base url, you can get from environment.
    }),  
  ],  
})
```
    
Extend RestService in your service:
```typescript
import { Injectable } from '@angular/core';  
import { Observable } from 'rxjs';  
import { Auth, User } from '../../models';  
import { Body, Get, Post, RestService } from 'ngx-rest-service';  
  
@Injectable({  
  providedIn: 'root',  
})  
export class AuthService extends RestService {  
  @Post('/auth/login')  
  login(@Body userLoginRequest: Auth.UserLoginRequest): Observable<Auth.LoginResponse> {  
    return null;  
  }  
  
  @Post('/auth/register')  
  register(@Body userRegisterRequest: Auth.UserRegisterRequest): Observable<User> {  
    return null;  
  }  
  
  @Get('/auth/me')  
  inquireMe(): Observable<User> {  
    return null;  
  }  
}
```
#### @Get()
You can use @Get() decorator to make GET request:
```typescript
@Get('/projects')  
getProjects(): Observable<Project> {  
  return null;  
}
```
Equals:

    <apiBaseUrl>/projects

---
```typescript
@Get('/projects/{code}')  
getProjectByCode(@Path('code') code: string): Observable<Project> {  
  return null;  
}
```
Equals:

    <apiBaseUrl>/projects/{code}
---
  
```typescript
@Get('/projects')  
getProjects(@Query('page') page?: number, @Query('limit') limit?: number): Observable<Pagination<Project>> {  
  return null;  
}
```
Equals:

    <apiBaseUrl>/projects?page={page}&limit={limit}
---
```typescript
@Get('/projects/${id}')   
inquireAcquisitionCredit(
  @Path('id') id: number,  
  @Params('personCount') personCount: number,  
): Observable<Project[]> {  
  return null;  
}
```
Equals:

    <apiBaseUrl>//projects/{id}

Query String Parameters

    personCount: ${personCount}

#### @Post()
```typescript
@Post('/projects/create')  
createProject(@Body project: Project): Observable<Project> {  
  return null;  
}
```

#### @Put()
```typescript
@Put('/projects/update')  
updateProject(@Body project: Project): Observable<Project> {  
  return null;  
}
```
### @Delete()
```typescript
@Delete('/projects/{id}')  
deleteProject(@Path('id') id: number): Observable<DeleteResult> {  
  return null;  
}
```
### Download  blob example
```typescript
@Get('/downloadExcel')    
@Headers({  
  Accept: 'application/octet-stream,application/json',  
})  
@ResponseType(eHTTP.ResponseType.Blob)  
inquireBillingAccountChargesSummaryExcel(  
  @Body body: DownloadProjectsExcelRequest,  
): Observable<Blob> {  
  return null;  
}
```
