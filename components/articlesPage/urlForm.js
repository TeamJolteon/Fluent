import formStyles from '../../styles/ArticleStyles/textForm.module.css';

export default function UrlForm() {
  return (
    <div className={formStyles.submitForm}>
      <div>
        <form>
          <div>
            <label>
              URL:
              <input type='text'/>
            </label>
          </div>
        </form>
      </div>
      <button>Submit</button>
    </div>
  )
};