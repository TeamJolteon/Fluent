import formStyles from '../../styles/ArticleStyles/textForm.module.css';

export default function TextForm() {
  return (
    <div>
      <div className={formStyles.submitForm}>
        <form>
          <div>
            <label>
              Article Title:
              <input type='text'/>
            </label>
          </div>
          <div>
            <label>
              Source:
              <input type='text'/>
            </label>
          </div>
          <div>
            <label>
              Text:
            </label>
            <textarea cols="50" rows="10" />
          </div>
        </form>
      </div>
      <button>Submit</button>
    </div>
  )
};