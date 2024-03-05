"use client";
import React, { useState } from "react";
import { Card, Button, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { PhoneCall } from "tabler-icons-react"

const UsersCard = ({ propkey, data, profile, handleDelete }) => {
    const [followUser, setFollowUser] = useState({});
    const handleFollow = (id) => {
        setFollowUser((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    return (
        <Col key={propkey}>
            <Card style={{ width: '18rem' }} className="shadow">
                <div className="text-center">
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="button-tooltip-2">{data.username}</Tooltip>}
                    >
                        <a href={`https://www.${data.website}`} target="_blank" rel="noopener noreferrer">
                            <div className="rounded-circle overflow-hidden mx-auto mt-3" style={{ width: '120px', height: '120px' }}>
                                <Card.Img variant="top" src={`data:image/svg+xml;utf8,${encodeURIComponent(profile[data.username])}`} alt="User Profile" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </div>
                        </a>
                    </OverlayTrigger>
                </div>
                <Card.Body>
                    <div className="text-center mb-3">
                        <Card.Title>{data.username} {followUser[data.id] && (<i class="bi bi-star"></i>)}</Card.Title>
                    </div>
                    <div style={{ marginLeft: '22px' }}>
                        <Card.Text className="mb-2">
                            <a className="text-decoration-none" style={{ color: "black" }} href={`mailto:${data.email}`}>
                                <i class="bi bi-envelope-at" style={{ marginRight: "7px" }}></i>
                                {data.email}
                            </a>
                        </Card.Text>
                        <Card.Text className="mb-2">
                            <a className="text-decoration-none" style={{ color: "black" }} href={`tel:${data.phone}`}>
                                <PhoneCall
                                    size={20}
                                    strokeWidth={2}
                                    style={{ marginRight: "7px" }}
                                />
                                {data.phone}
                            </a>
                        </Card.Text>
                        <Card.Text className="mb-0">
                            <a className="text-decoration-none" style={{ color: "black" }} href={`https://www.${data.website}`} target="_blank">
                                <i class="bi bi-globe2" style={{ marginRight: "7px" }}></i>
                                {data.website}
                            </a>
                        </Card.Text>
                    </div>
                </Card.Body>

                <Card.Body className="text-center mt-0">
                    <Button onClick={() => handleFollow(data.id)} variant={followUser[data.id] ? 'outline-primary' : 'primary'} style={{ marginRight: "25px" }}>
                        {followUser[data.id] ? (
                            <>
                                <i className="bi bi-person-dash"></i> Unfollow
                            </>
                        ) : (
                            <>
                                <i className="bi bi-person-add"></i> Follow
                            </>
                        )}

                    </Button>
                    <Button variant="outline-primary" onClick={() => handleDelete(propkey)}>
                        <i className="bi bi-trash3"></i> Delete
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}
export default UsersCard;