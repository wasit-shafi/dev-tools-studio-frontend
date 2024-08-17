# Project Coding Standards to follow

- Replace all the old Angular features with latest features

  - Replace all the Input/Output with input/output signals
  - Replace all the Dependency Injection via constructor with inject().

- There should be no getter function as it causes performance issues.
- Avoid calling directly inside template/view as it gets executed on each lifecycle, instead of use custom directives
- Make use of angular signal instead of BehaviorSubject/Observable.
