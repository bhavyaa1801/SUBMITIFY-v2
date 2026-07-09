package models

// only the blueprint for a document profile.

type SectionDefinition struct {
	Title string
	Type  SectionType
}

type ProfileDefinition struct {
	Name     Profile
	Sections []SectionDefinition
}


var ProgrammingProfile = ProfileDefinition{
	Name: Programming,

	Sections: []SectionDefinition{
		{
			Title: "Algorithm",
			Type:  Paragraph,
		},
		{
			Title: "Source Code",
			Type:  Code,
		},
		{
			Title: "Output",
			Type:  Paragraph,
		},
	},
}


var TheoryProfile = ProfileDefinition{
	Name: Theory,

	Sections: []SectionDefinition{
		{
			Title: "Answer",
			Type:  Paragraph,
		},
	},
}


var SQLProfile = ProfileDefinition{
	Name: SQL,

	Sections: []SectionDefinition{
		{
			Title: "Aim",
			Type:  Paragraph,
		},
		{
			Title: "Theory",
			Type:  Paragraph,
		},
		{
			Title: "SQL Query",
			Type:  Code,
		},
		{
			Title: "Output",
			Type:  Paragraph,
		},
	},
}


var MathematicsProfile = ProfileDefinition{
	Name: Mathematics,

	Sections: []SectionDefinition{
		{
			Title: "Solution",
			Type:  Paragraph,
		},
	},
}

var NetworkingProfile = ProfileDefinition{
	Name: Networking,

	Sections: []SectionDefinition{
		{
			Title: "Aim",
			Type:  Paragraph,
		},
		{
			Title: "Theory",
			Type:  Paragraph,
		},
		{
			Title: "Configuration",
			Type:  Code,
		},
		{
			Title: "Output",
			Type:  Paragraph,
		},
	},
}


var GenericProfile = ProfileDefinition{
	Name: Generic,

	Sections: []SectionDefinition{
		{
			Title: "Content",
			Type:  Paragraph,
		},
	},
}

func GetProfileDefinition(profile Profile) ProfileDefinition {

	switch profile {

	case Programming:
		return ProgrammingProfile

	case Theory:
		return TheoryProfile

	case SQL:
		return SQLProfile

	case Mathematics:
		return MathematicsProfile

	case Networking:
		return NetworkingProfile

	default:
		return GenericProfile
	}
}