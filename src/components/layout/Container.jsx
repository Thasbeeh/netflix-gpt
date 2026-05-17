export function Container({
  as: Tag = 'div',
  className = '',
  maxWidth = 'default',
  children,
}) {
  const maxWidthClass = {
    narrow:  'max-w-2xl',           // articles, auth forms
    default: 'max-w-6xl',           // standard pages
    wide:    'max-w-screen-2xl',    // dashboards, admin panels
    full:    'w-full',              // edge-to-edge sections
  }[maxWidth];

  return (
    <Tag
      className={[
        'mx-auto w-full',
        'px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24',
        maxWidthClass,
        className,
      ].join(' ')}
    >
      {children}
    </Tag>
  );
}
