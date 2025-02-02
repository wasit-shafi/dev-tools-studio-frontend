# Project Coding Standards to follow

- Replace all the old Angular features with latest features

  - Replace all the Input/Output with input/output signals
  - Replace all the Dependency Injection via constructor with inject().

- There should be no getter function as it causes performance issues.
- Avoid calling directly inside template/view as it gets executed on each lifecycle, instead of use custom directives
- Make use of angular signal instead of BehaviorSubject/Observable.
- Make use of 'readonly' where ever possible - to restrict any reassignment to service, data members etc
<!-- for more info ref: https://www.angulartraining.com/daily-newsletter/best-practices-for-using-visibility-modifiers/ -->
- The access specifier preferences should follow - private => protected => public
- Access Specifier must be mentions even if its **public**, to avoid any doubts later.

- Content Order of component file:

  - @ViewChild()
  - @ViewChild()
  - ...
  - ...
  - @Input()
  - @Output()
  - ...
  - ...
  - \_\_\_ = input()
  - \_\_\_ = output()
  - \_\_\_ = model()
  - ...
  - ...
  - public readonly DI = inject(...); // should be in sorted order
  - private readonly DI = inject(...);
  - protected readonly DI = inject(...);
  - ...
  - ...
  - public var = \_\_\_
  - public readonly var = \_\_\_
  - private var = \_\_\_
  - private readonly var = \_\_\_
  - ...
  - ...
  - constructor() {}
  - ...
  - ...
  - ngOnInit(): void {}
  - LIFE CYCLE HOOKS IN CHRONOLOGICAL ORDER
  - ngOnDestroy(): void {}
  - ...
  - ...
  - regular methods
  -

- All the service DI must suffix 'Service' eg: appService, authService etc, in-order to differentiate service across application
  - Correct : `private readonly authService = inject(...);`
  - Incorrect: `private readonly auth = inject(...);`
-
-
