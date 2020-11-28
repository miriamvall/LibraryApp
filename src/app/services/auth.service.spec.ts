import { TestBed, async, inject  } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports: [
    		HttpClientTestingModule
    	],
    	providers: [
    		AuthService
    	]
    });
    authService = TestBed.inject(AuthService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
  	httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get the data successfully', () => {
  	authService.getUserProfile("5f7ca3bdc0684d1338eeaa8a").subscribe((data: any) => {
  		expect.(data.username).toBe('mirivalls');
  	});

  	const req = httpMock.expectOne('http://localhost:8080/api/user/:id', 'call to api');
  	expect(req.request.method).toBe('GET');

  	req.flush({
  		username: 'mirivalls'
  	});
  });






});
