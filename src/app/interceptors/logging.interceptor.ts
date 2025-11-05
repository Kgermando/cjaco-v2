import { HttpInterceptorFn } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  
  console.log(`%c🔄 HTTP Request`, 'color: blue; font-weight: bold');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', req.headers);
  
  // Log body for POST/PUT requests
  if (req.body) {
    if (req.body instanceof FormData) {
      console.log('Body Type: FormData');
      console.log('FormData entries:');
      const formData = req.body as FormData;
      formData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(`  ${key}: [File] ${value.name} (${value.size} bytes)`);
        } else {
          console.log(`  ${key}:`, value);
        }
      });
    } else {
      console.log('Body:', req.body);
    }
  }

  return next(req).pipe(
    tap(event => {
      const elapsed = Date.now() - started;
      console.log(`%c✅ HTTP Response (${elapsed}ms)`, 'color: green; font-weight: bold');
      console.log('Status: Success');
      console.log('Event:', event);
    }),
    catchError(error => {
      const elapsed = Date.now() - started;
      console.log(`%c❌ HTTP Error (${elapsed}ms)`, 'color: red; font-weight: bold');
      console.log('Status Code:', error.status);
      console.log('Status Text:', error.statusText);
      console.log('URL:', error.url);
      console.log('Error:', error.error);
      console.log('Message:', error.message);
      
      return throwError(() => error);
    })
  );
};
