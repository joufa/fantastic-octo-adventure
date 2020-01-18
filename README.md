# Workday-times

A time tracking webapp

## CLI API

`HH{.}mm-HH{.}.mm`<br>
Adds a new timespan if it doesn't conflict with existing timespans.

`d HH{.}mm-HH{.}.mm`<br>
Deletes a timespan.

`s p HH{.}mm`<br>
Starts timespan pending from given time.

`S`<br>
Starts timespan pending from now.

`E`<br>
Ends timespan pending.

`d all`<br>
Removes all timespans from current day.

`s [idx] `<br>
Selects a timespan at given index.

`us [idx]`<br>
Removes selection from given index.

`s [idx] d`<br>
Deletes a timespan at given index.

`s [idx] start HH{.}mm`<br>
Changes the start time of the selected timespan.

`s [idx] end HH{.}mm`<br>
Changes the end time of the selected timespan.

`M [idx]-[idx] `<br>
Merges the timespans at given indexes.

`M all`<br>
Merges all timespans that are connected.

`app [minutes] `<br>
Appends given minutes to the last timespan.
