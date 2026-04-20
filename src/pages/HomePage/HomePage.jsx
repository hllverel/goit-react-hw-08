import css from './HomePage.module.css'
  
export default function HomePage() {
  return (
    <div className={css.homepage}>
        <div className={css.emoji}>📇</div>
        <h1 className={css.title}>Phonebook</h1>
        <p className={css.subtitle}>
          Keep all your important contacts in one secure place. 
          Add, search, and manage your contacts with ease.
        </p>
    </div>
  )
};