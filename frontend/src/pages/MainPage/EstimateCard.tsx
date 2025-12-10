import type { EstimateLESchemaType } from "../../core/schemas";
import { routes } from "../routes";
import css from "./index.module.scss";
import React from "react";
import { NavLink } from "react-router-dom";


const EstimateCardMiniC = ({ estimate }: { estimate: EstimateLESchemaType }) => {
  const { id, title, updatedAt } = estimate;

  return (
    <div key={id} className={css.estimate}>
      <h3>
        <NavLink to={routes.getEstimatePage(String(estimate.id))}>{title}</NavLink>
      </h3>
      <p>{updatedAt.toLocaleDateString()}</p>
    </div>
  );
};

export const EstimateCardMini = React.memo(EstimateCardMiniC) as typeof EstimateCardMiniC;
