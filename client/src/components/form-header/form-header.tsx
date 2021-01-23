import React from "react";
import "./form-header.scss";

export const FormHeader = React.memo((p: TFormHeaderProps) => {
  return <div className={`${p.className || ""} form-header`}>
    <div className="form-header__row form-header__row--row-c">
      <div className="form-header__col">
        <div className="form-header__logo-wrapper">
          <div className="form-header__logo logo"/>
          <div className="form-header__title text">Messenger</div>
        </div>
      </div>

      <div className="form-header__col form-header__col--col-r">
        <button className="form-header__next next-button"
          type="submit"
          onClick={p.onNextClick}>
          Next
        </button>
      </div>
    </div>
  </div>;
});

type TFormHeaderProps = {
  className?: string,
  onNextClick?: () => void
}
