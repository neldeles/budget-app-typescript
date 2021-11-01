export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 Tailwind utility class to allow conditional css

 Usage example:
 <button className={
    classNames(
      'this is always applied',
      isTruthy && 'this only when the isTruthy is truthy',
      active ? 'active classes' : 'inactive classes'
      )
    }
  >
    Text
  </button>
*/
