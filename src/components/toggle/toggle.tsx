import * as React from 'react';
import './toggle.css';

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Toggle = (props: Props) => (
  <label className="toggle">
    <input type="checkbox" className="checkbox" {...props} />
    <div className="circle" />
  </label>
);

export default Toggle;
