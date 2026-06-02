type HeaderProps = {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <div className="header__actions">
        <button type="button" className="header__btn header__btn--ghost">
          Search
        </button>
        <button type="button" className="header__btn header__btn--primary">
          New report
        </button>
      </div>
    </header>
  )
}
