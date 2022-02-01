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
          <div>
          <form>
            <label>
              Share With Community?
              <select>
                <option>Yes</option>
                <option>No</option>
              </select>
            </label>
          </form>
        </div>
        <input type="submit"/>
        </form>
      </div>
    </div>
  )
};