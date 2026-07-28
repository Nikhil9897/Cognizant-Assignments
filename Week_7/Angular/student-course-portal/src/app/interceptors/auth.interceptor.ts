import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = 'demo-jwt-token-digital-nurture-5.0';

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  console.log(`[AuthInterceptor] ${req.method} ${req.url}`);
  return next(clonedReq);
};
