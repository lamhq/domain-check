import MuiTypography, { type TypographyProps } from '@mui/material/Typography';

export default function Typography({ sx, variant, ...rest }: TypographyProps) {
  let customStyleProps = undefined;
  variant = variant ?? 'body1';

  switch (variant) {
    case 'h1':
      customStyleProps = {
        fontSize: '1.3125rem',
        fontWeight: 'bold',
      };
      break;

    case 'h2':
      customStyleProps = {
        fontSize: '1.375rem',
        marginBottom: '1.5625rem',
        fontWeight: 'bold',
      };
      break;

    case 'h3':
      customStyleProps = {
        fontSize: '1.25rem',
      };
      break;

    case 'h4':
      customStyleProps = {
        fontSize: '1.0625rem',
        fontWeight: 'bold',
      };
      break;

    case 'body2':
      customStyleProps = {
        fontSize: '0.75rem',
      };
      break;

    case 'body1':
      customStyleProps = {
        fontSize: '1rem',
        marginBottom: '1rem',
      };
      break;

    default:
      break;
  }
  return (
    <MuiTypography
      variant={variant}
      sx={[
        customStyleProps,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...rest}
    />
  );
}
