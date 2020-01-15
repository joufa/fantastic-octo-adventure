import { Observable } from 'rxjs';
export interface ObservableCollection<T> {
  asObservable(): Observable<T[]>;
}
