from pydantic import BaseModel, EmailStr, Field


class IndustryModel(BaseModel):
    industry: str
    platform: str
    position: str
    responsibilities: str
    software: str


class InsertAlumniRequest(BaseModel):
    student_id: str
    batch: int
    name: str
    email: EmailStr
    industries: list["IndustryModel"]
    skills: str
    github: str = Field(default="")
    facebook: str = Field(default="")
    linked_in: str = Field(default="")
    profile_photo: str = Field(default="")
    hometown: str = Field(default="")

    def as_user_model(self):
        sorting_order = "".join(filter(str.isdigit, self.student_id.lower().strip()))

        return {
            "student_id": self.student_id.upper().strip(),
            "batch": self.batch,
            "name": self.name.strip(),
            "email": self.email,
            "industries": [x.model_dump() for x in self.industries],
            "github": self.github,
            "hometown": self.hometown,
            "skills": {x.strip() for x in self.skills.split(",") if x.strip()},
            "linked_in": self.linked_in,
            "facebook": self.facebook,
            "role": "alumni",
            "sorting_order": int(sorting_order),
            "profile_photo": self.profile_photo,
        }


class UpdateAlumniRequest(InsertAlumniRequest): ...
