import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

const propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

function CardData({ title, data }) {
    return (
        <View style={styles.container}>
            <Card>
                <Card.Content>

                    <Title>{title}</Title>
                    <Paragraph>
                        {data}
                    </Paragraph>
                </Card.Content>
            </Card>
        </View >
    );
}

CardData.propTypes = propTypes;

export default CardData;