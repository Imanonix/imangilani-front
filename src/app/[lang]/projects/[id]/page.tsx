'use client'
import apiEndPoint from '@/ApiEndPoint'
import ProjectCard from '@/app/components/projectCard'
import { LanguageContext, LanguageContextType } from '@/app/providers/languageContext'
import { ApiResponse, IProjectsPreviewDTO } from '@/types/type'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'


const Container= styled.div`
    min-height: 70vh;
    width: calc(100% - 1rem);
    display:flex;
    justify-content:flex-start;
    align-items:center;
    flex-wrap: wrap;
    margin: 0px auto;
`

const page = () => {

    const {language} = useContext<LanguageContextType>(LanguageContext)
    const [, setIsLoading] = useState<boolean>(true)
    const [projects, setProjects] = useState<IProjectsPreviewDTO[]>([])
    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`${apiEndPoint.baseURL}/api/public/projects?lang=${language}`, {
                    method: "GET"
                })
                const data: ApiResponse<IProjectsPreviewDTO[]> = await response.json()
                if (data.status === 200) {
                    setProjects(data.data)
                    return
                }
            }
            catch { }
            finally {
                setIsLoading(false)
            }
        }; fetchProject();
    }, [language])

    return (
        <Container>
            <div className="flex flex-wrap justify-center mx-auto my-8 gap-4">
                {projects.map(project => (
                    <ProjectCard key={project.id} {...project} />
                ))}
            </div>
        </Container>
    )
}

export default page
