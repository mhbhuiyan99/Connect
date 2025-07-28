from fastapi import APIRouter

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/preset")
async def preset_skills():
    return [
        "Python",
        "MongoDB",
        "SQL",
        "React",
        "Node.js",
        "JavaScript",
        "HTML",
        "CSS",
        "Git",
        "GitHub",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "GCP",
        "Linux",
        "Windows",
        "MacOS",
    ]
