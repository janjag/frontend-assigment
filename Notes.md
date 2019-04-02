## Project notes

Main source of improvements to this app would be moving core logic like sorting and filtering (in ful scale app also pagination) to API. For smaller datasets there is no big difference betwen keeping data in memory or fetching each time, but for larger datasets there would me major tradeoff (mostly for mobile users): use more data for users dataplan or faster battery drain.  Sorting requires more atention as it's not quite there. 
