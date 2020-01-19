import { Types } from '../core/commands';

/**
 * Maps regular expression to commands.
 */
export const CommandExpressions = {
  [Types.ADD_TIMESPAN]:            new RegExp('^([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$'),
  [Types.DELETE_TIMESPAN]:         new RegExp('^d ([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]-([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$'),
  [Types.START_PENDING_FROM_TIME]: new RegExp('^s p ([0-9]|0[0-9]|1[0-9]|2[0-3]).[0-5][0-9]$'),
  [Types.START_PENDING]:           new RegExp('^S$'),
  [Types.END_PENDING]:             new RegExp('^E$'),
  [Types.DELETE_ALL]:              new RegExp('^d all$'),
  [Types.SELECT_ONE]:              new RegExp('^s [1-9][0-9]? $'),
  [Types.UNSELECT]:                new RegExp('^us [1-9][0-9]?$'),
  [Types.DELETE_ONE]:              new RegExp('^s [1-9][0-9]? d$'),
  [Types.MERGE_ALL]:               new RegExp('^M all$')
};
