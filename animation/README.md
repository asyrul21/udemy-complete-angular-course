# Animations

1.

```bash
npm install --save @angular/animations
```

2. Add the `BrowserAnimationsModule` to your imports[] array in AppModule

- This Module needs to be imported from @angular/platform-browser/animations' => import { BrowserAnimationsModule } from '@angular/platform-browser/animations' (in the AppModule!)
- You then import trigger , state , style etc from @angular/animations instead of @angular/core
