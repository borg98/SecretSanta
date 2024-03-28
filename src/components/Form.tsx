import { ChangeEvent, useEffect, useState } from "react";
import "./form.css";
import { Button } from "@mui/material";
import { Person } from "../models/Person";
import { NameInput } from "./NameInput";
import { AssignedNames } from "./AssignedNames";

export function Form() {
  const nameListStartValue: Person[] = [new Person("1", "", "")];
  const [nameList, setNameList] = useState<Person[]>(nameListStartValue);
  const [isShown, setIsShown] = useState(false);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  function getNames(e: ChangeEvent<HTMLInputElement>) {
    const propertyName = e.target.name;
    const inputValue = e.target.value;
    const indexdPerson = nameList.findIndex(
      (person) => person.id === propertyName
    );

    if (indexdPerson !== -1) {
      setNameList((prevList) =>
        prevList.map((person, index) =>
          index === indexdPerson ? { ...person, name: inputValue } : person
        )
      );
    } else {
      setNameList((prevList) => [
        ...prevList,
        { id: propertyName, name: inputValue, email: "" },
      ]);
    }
  }
  function getEmail(e: ChangeEvent<HTMLInputElement>) {
    const propertyName = e.target.name;
    const inputValue = e.target.value;
    const indexdPerson = nameList.findIndex(
      (person) => person.id === propertyName
    );

    if (indexdPerson !== -1) {
      setNameList((prevList) =>
        prevList.map((person, index) =>
          index === indexdPerson ? { ...person, email: inputValue } : person
        )
      );
    }
  }

  function assignRandomNames() {
    const assignedNames: { [key: string]: boolean } = {};
    const updatedNameList = nameList.map((person) => {
      let shuffledNames = shuffleArray(nameList.map((p) => p.name));

      while (
        person.name === shuffledNames[0] ||
        assignedNames[shuffledNames[0]]
      ) {
        shuffledNames = shuffleArray(nameList.map((p) => p.name));
      }

      assignedNames[shuffledNames[0]] = true;
      return {
        ...person,
        assignedName:
          person.name !== shuffledNames[0] ? shuffledNames[0] : undefined,
      };
    });

    setNameList(updatedNameList);
  }

  // Fisher-Yates shuffle function
  function shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function assignNames() {
    const noNameIndex = nameList.findIndex((person) => person.name === "");

    function hasDuplicateName(people: Person[]): boolean {
      const namesSet = new Set<string>();

      return people.some((person) => {
        const { name } = person;

        if (namesSet.has(name)) {
          return true;
        }

        namesSet.add(name);
        return false;
      });
    }

    if (
      nameList.length < 2 ||
      noNameIndex !== -1 ||
      hasDuplicateName(nameList)
    ) {
      alert("Minst två namn krävs och alla namn måste vara unika");
    } else {
      assignRandomNames();
      setIsShown(true);
    }
  }

  function addInput() {
    setNameList([...nameList, new Person(String(nameList.length + 1), "", "")]);
  }
  useEffect(() => {
    if (nameList.length === 1) {
      setShowRemoveButton(false);
    } else {
      setShowRemoveButton(true);
    }
  }, [nameList]);

  const removeInput = () => {
    setNameList((currNamelist) =>
      currNamelist.slice(0, currNamelist.length - 1)
    );
  };

  return (
    <>
      <div className="form-container">
        <form action="none" className="form">
          {nameList.map((person, index) => (
            <NameInput
              key={index}
              name={person.id}
              email={person.email}
              onNameChange={getNames}
              onEmailChange={getEmail}
            />
          ))}
          <Button variant="contained" onClick={addInput} className="addButton">
            Lägg till person
          </Button>

          {showRemoveButton && (
            <Button
              variant="contained"
              onClick={removeInput}
              className="addButton"
            >
              Ta bort senast tillagda
            </Button>
          )}

          <Button
            variant="contained"
            type="button"
            onClick={assignNames}
            className="runButton"
          >
            Kör
          </Button>

          {isShown && (
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                setIsShown(false);
                setNameList(nameListStartValue);
                location.reload();
              }}
            >
              Börja om
            </Button>
          )}
          {isShown && <AssignedNames nameList={nameList} />}
        </form>
      </div>
    </>
  );
}
