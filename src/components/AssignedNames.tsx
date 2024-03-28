import { Person } from "../models/Person";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface IAssignedNames {
  nameList: Person[];
}

export function AssignedNames(props: IAssignedNames) {
  const html = props.nameList.map((person, i) => {
    return (
      <Accordion key={i}>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <b>{person.name}:</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{person.assignedName}</Typography>
        </AccordionDetails>
      </Accordion>
    );
  });

  return (
    <>
      <div className="main-accordion">
        <Accordion>
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel-content"
            id="panel-header"
          >
            <Typography>Resultat</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{html}</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
