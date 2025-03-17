import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const Loader = inject(LoaderService);
  const status = Loader.loading$;
  
    Loader.show(); //show loading
  

  //implements sth happens when response is come.
  return next(req).pipe(finalize(()=>{
      Loader.hide(); //hide loading
  }));
};
