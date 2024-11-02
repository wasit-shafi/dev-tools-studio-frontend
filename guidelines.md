# Project Coding Standards to follow

- Replace all the old Angular features with latest features

  - Replace all the Input/Output with input/output signals
  - Replace all the Dependency Injection via constructor with inject().

- There should be no getter function as it causes performance issues.
- Avoid calling directly inside template/view as it gets executed on each lifecycle, instead of use custom directives
- Make use of angular signal instead of BehaviorSubject/Observable.
- Make use of 'readonly' where ever possible - to restrict any reassignment to service, data members etc
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
  - ...
  - ...
  - public var = ___
  - public readonly var = ___
  - private var = ___
  - private readonly var = ___
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
  -
  -
  -
  -
  -
  -
  -

-
