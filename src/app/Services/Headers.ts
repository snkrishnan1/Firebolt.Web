import { Headers } from '@angular/http';

export const ContentHeaders = new Headers();
ContentHeaders.append('Accept', 'application/json');
ContentHeaders.append('Content-Type', 'application/json');
//ContentHeaders.append("domain", "VM-MNDTRE-CLCKD");
//ContentHeaders.append("user", "ryork");