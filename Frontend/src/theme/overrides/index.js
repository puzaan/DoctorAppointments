//

import Card from './Card';
import Paper from './Paper';
import Button from './Button';
import Typography from './Typography';
import CssBaseline from './CssBaseline';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return Object.assign(
    Card(theme),
    Paper(theme),
    Button(theme),
    Typography(theme),
    CssBaseline(theme),
  );
}
