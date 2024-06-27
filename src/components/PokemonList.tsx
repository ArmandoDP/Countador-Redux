import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from "react-native";
import { PokemonClient } from "pokenode-ts";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setPokemon } from "../features/pokemon/pokemonSlice";
import { increment, decrement, incremenByAmount, decrementByAmount } from "../features/counter/counterSlide";
import Pokemon, { PokemonStats } from "../models/Pokemon";
import { Colors } from "../colors";

const PokemonList = () => {

    const dispatch = useAppDispatch();
    const currentPokemon = useAppSelector(state => state.pokemon);
    const counter = useAppSelector(state => state.counter.value);

    useEffect(() => {
        const fetchPokemon = async () => {
            const api = new PokemonClient();
            await api
                .getPokemonById(counter)
                .then(pokemon => {
                    const currentPokemonStats: PokemonStats = {
                        hp: pokemon.stats[0].base_stat,
                        attack: pokemon.stats[1].base_stat,
                        defense: pokemon.stats[2].base_stat,
                        speed: pokemon.stats[5].base_stat,
                        specialAttack: pokemon.stats[3].base_stat,
                        specialDefense: pokemon.stats[4].base_stat
                    };
                    const newPokemon: Pokemon = {
                        id: pokemon.id,
                        name: pokemon.name,
                        image: pokemon?.sprites?.front_default?.toString(),
                        height: pokemon.height,
                        weight: pokemon.weight,
                        type: pokemon?.types[0].type?.name?.toString(),
                        move: pokemon?.moves[0].move?.name?.toString(),
                        stats: currentPokemonStats,
                        color: pokemon?.types[0]?.type?.name?.toString() === 'grass' ? Colors.grass
                            : pokemon?.types[0]?.type?.name?.toString() === 'fire' ? Colors.fire
                            : pokemon?.types[0]?.type?.name?.toString() === 'water'? Colors.water
                            : pokemon?.types[0]?.type?.name?.toString() === 'bug' ? Colors.bug
                            : pokemon?.types[0]?.type?.name?.toString() === 'normal' ? Colors.normal
                            : pokemon?.types[0]?.type?.name?.toString() === 'poison' ? Colors.poison
                            : pokemon?.types[0]?.type?.name?.toString() === 'electric' ? Colors.electric
                            : pokemon?.types[0]?.type?.name?.toString() === 'ground' ? Colors.ground
                            : pokemon?.types[0]?.type?.name?.toString() === 'ice' ? Colors.ice
                            : pokemon?.types[0]?.type?.name?.toString() === 'fighting' ? Colors.fighting
                            : pokemon?.types[0]?.type?.name?.toString() === 'psychic' ? Colors.psychic
                            : pokemon?.types[0]?.type?.name?.toString() === 'flying' ? Colors.flying
                            : pokemon?.types[0]?.type?.name?.toString() === 'rock' ? Colors.rock
                            : pokemon?.types[0]?.type?.name?.toString() === 'ghost' ? Colors.ghost
                            : pokemon?.types[0]?.type?.name?.toString() === 'dragon' ? Colors.dragon
                            : pokemon?.types[0]?.type?.name?.toString() === 'dark' ? Colors.dark
                            : pokemon?.types[0]?.type?.name?.toString() === 'steel' ? Colors.steel
                            : pokemon?.types[0]?.type?.name?.toString() === 'fairy' ? Colors.fairy
                            : Colors.black
                    };
                    dispatch(setPokemon(newPokemon));
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchPokemon();
    }, [counter, dispatch]);

    const handleNextButton = () => {
        dispatch(increment());
    };
    const handlePreviousButton = () => {
        dispatch(decrement());
    };
    const handleIncrementByAmount = (value: number) => {
        dispatch(incremenByAmount(value));
    };
    const handleDecrementByAmount = (value: number) => {
        dispatch(decrementByAmount(value));
    };

    const StatLine = (
        props: {
        number: number | undefined;
        color: string | undefined;
        }) => {
        return (
            <View
                style={{
                    width: props.number,
                    marginVertical: 6,
                    height: 5,
                    marginLeft: 10,
                    borderRadius: 5,
                    backgroundColor:props.color,
                 }} />
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: currentPokemon.color }]}>
            <StatusBar barStyle="light-content" backgroundColor={currentPokemon.color} />
            <Image style={styles.pokeball} source={require('../images/pokeball.png')} />
            <View style={styles.whiteSheet}/>
            <SafeAreaView>
                    {/* Name and ID of Pokemon */}
                    <View style={styles.viewStyle}>
                        <Text style={styles.pokemonName}>{currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}</Text>
                        <Text style={styles.pokemonName}>#{ currentPokemon.id }</Text>
                </View>
                    {/* Name and ID of Pokemon */}
                    {/* Image and buttons of Pokemon */}
                <View style={styles.viewStyle}>
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handlePreviousButton}>
                                <Text style={styles.buttonText}>◀</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleDecrementByAmount(100)}>
                                <Text style={styles.buttonText}>⇇</Text>
                            </TouchableOpacity>
                        </View>
                        <Image source={{ uri: currentPokemon.image }} style={styles.pokemonImage} />
                        <View>
                            <TouchableOpacity style={styles.button} onPress={handleNextButton}>
                                <Text style={styles.buttonText}>▶</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => handleIncrementByAmount(100)}>
                                <Text style={styles.buttonText}>⇉</Text>
                            </TouchableOpacity>
                        </View>
                </View>
                    {/* Image and buttons of Pokemon */}
                <View style={[styles.pokemonTypeContainer, {alignSelf:'center', backgroundColor: currentPokemon.color}]}>
                    <Text style={styles.pokemonType}>{currentPokemon.type}</Text>
                </View>
                {/* Pokemon About */}
                <View>
                    <Text style={[styles.aboutText, {color: currentPokemon.color}]}>
                        About
                    </Text>
                    <View style={[styles.viewStyle, { justifyContent: 'center', marginTop: 20, }]}>
                        <View style={{ alignItems: 'center', marginHorizontal: 10, }}>
                            <Text style={styles.aboutSizes}>
                                ⚖️{' '}
                                {currentPokemon.weight?.toString()
                                    .slice(0, currentPokemon.weight.toString().length - 1)}
                                .
                                {currentPokemon.weight?.toString().slice(currentPokemon.weight.toString().length - 1, currentPokemon.weight.toString().length)}{' '}kg
                            </Text>
                            <Text style={{ color: Colors.mediumGray, fontSize: 12, marginTop: 10 }}>
                                Weight
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                            <Text style={styles.aboutSizes}>
                                📏{' '}
                                {currentPokemon.height?.toString()
                                    .slice(currentPokemon.height.toString().length - 1)}.
                                {currentPokemon.height?.toString().slice(
                                    currentPokemon.height.toString().length - 1,
                                    currentPokemon.height.toString().length
                                ) }{''}
                                m
                            </Text>
                            <Text style={{ color: Colors.mediumGray, fontSize: 12, marginTop: 10 }}>
                                Height
                            </Text>
                        </View>
                        <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                            <Text style={styles.aboutSizes}>
                                ⚔️{' '}
                                {currentPokemon.move}
                            </Text>
                            <Text style={{ color: Colors.mediumGray, fontSize: 12, marginTop: 10 }}>
                                Move
                            </Text>
                        </View>
                    </View>
                </View>
                {/* Pokemon About */}
                <View>
                    <Text style={[styles.aboutText, {color: currentPokemon.color}]}>
                        Base Stats
                    </Text>
                    <View style={[styles.viewStyle,{justifyContent: 'flex-start', marginHorizontal: 38, marginTop: 20,}]}>
                        <View style={{ alignItems: 'flex-end', marginRight: 10 }}>
                            <Text>HP</Text>
                            <Text>Attack</Text>
                            <Text>Defense</Text>
                            <Text>Special Attack</Text>
                            <Text>Special Defense</Text>
                            <Text>Speed</Text>
                        </View>
                        <View style={{ height: 100, width: 2, backgroundColor: Colors.lightGray, marginRight: 10 }} />
                        <View>
                            <Text>{currentPokemon.stats?.hp}</Text>
                            <Text>{currentPokemon.stats?.attack}</Text>
                            <Text>{currentPokemon.stats?.defense}</Text>
                            <Text>{currentPokemon.stats?.specialAttack}</Text>
                            <Text>{currentPokemon.stats?.specialDefense}</Text>
                            <Text>{currentPokemon.stats?.speed}</Text>
                        </View>
                        <View>
                            <StatLine number={currentPokemon.stats?.hp} color={currentPokemon.color} />
                            <StatLine number={currentPokemon.stats?.attack} color={currentPokemon.color} />
                            <StatLine number={currentPokemon.stats?.defense} color={currentPokemon.color} />
                            <StatLine number={currentPokemon.stats?.specialAttack} color={currentPokemon.color} />
                            <StatLine number={currentPokemon.stats?.specialDefense} color={currentPokemon.color} />
                            <StatLine number={currentPokemon.stats?.speed} color={currentPokemon.color} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default PokemonList;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    pokeball: {
        width: '65%',
        height: '30%',
        opacity: 0.3,
        position: 'absolute',
        right: 20,
        top: 50,
    },
    pokemonName: {
        fontSize: 35,
        elevation: 1,
        fontWeight: 'bold',
        color: Colors.white,
        margin: 20,
    },
    button: {
        width: 50,
        height: 50,
        backgroundColor: Colors.white,
        borderRadius: 25,
        alignItems: 'center',
        opacity: 0.8,
        justifyContent: 'center',
        elevation: 1,
        margin: 10,
    },
    pokemonImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 20,
        elevation: 1,
    },
    buttonText: {
        fontSize: 20,
        color: Colors.black,
    },
    pokemonType: {
        color: Colors.white,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
    },
    pokemonTypeContainer: {
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteSheet: {
        position: 'absolute',
        bottom: 30,
        left: 10,
        backgroundColor: Colors.white,
        elevation: 1,
        borderRadius: 30,
        width: '95%',
        height: '65%',
    },
    aboutText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.mediumGray,
        marginTop: 20,
        elevation: 1,
    },
    aboutSizes: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.mediumGray,
        marginTop: 20,
        elevation: 1,
    }
});